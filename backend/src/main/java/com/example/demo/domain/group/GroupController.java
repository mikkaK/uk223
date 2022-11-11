package com.example.demo.domain.group;

import com.example.demo.domain.group.dto.GroupDTO;
import com.example.demo.domain.group.dto.GroupMapper;
import com.example.demo.domain.user.dto.UserDTO;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.management.InstanceAlreadyExistsException;
import javax.management.InstanceNotFoundException;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.Set;
import java.util.UUID;

/**
 * Controller class for all group endpoints
 */
@RestController
@Validated
@RequestMapping("/group")
@Slf4j
public class GroupController {
    private final GroupService groupService;
    private final GroupMapper groupMapper;
    private final Logger logger;

    @Autowired
    public GroupController(GroupService groupService,GroupMapper groupMapper, Logger logger){
        this.groupService = groupService;
        this.groupMapper = groupMapper;
        this.logger = logger;
    }

    //endpoint which returns all groups
    @GetMapping({"", "/"})
    public ResponseEntity<List<GroupDTO>> retrieveAll(){
        logger.trace("fetching all groups");
        List<Group> groups = groupService.findAll();
        logger.trace("returning all groups");
        return new ResponseEntity<>(groupMapper.toDTOs(groups), HttpStatus.OK);
    }
    //endpoint which returns all members of a specific group
    //only accessible when admin or member of group
    @PreAuthorize("hasAuthority('USER_READ') || @userPermissionEvaluator.isMemberOfGroup(#id, authentication.principal.user)")
    @GetMapping("/members/{id}")
    public ResponseEntity<Set<UserDTO>> retrieveAllMembers(@PathVariable UUID id,
                                                           @RequestParam(required = false, defaultValue = "0") int page,
                                                           @RequestParam(required = false, defaultValue = "5") int size) throws InstanceNotFoundException {
        logger.trace("fetching {} members of group {} on page {}", size,id, page);
        Set<UserDTO> members = groupService.findMembersOfGroup(id, page, size);
        logger.trace("returning {} members of group: {}", size, id);
       return new ResponseEntity<>(members,HttpStatus.OK);
    }

    //endpoint which returns Group by ID
    //only accessible when admin or member of group
    @PreAuthorize("hasAuthority('USER_READ') || @userPermissionEvaluator.isMemberOfGroup(#groupId, authentication.principal.user)")
    @GetMapping("/{groupId}")
    public ResponseEntity<GroupDTO> retrieveGroupById(@PathVariable UUID groupId){
        logger.trace("fetching group by id: {}", groupId);
        Group group = groupService.findById(groupId);
        logger.trace("returning group with id: {} and name: {}", groupId, group.getGroupName());
        return new ResponseEntity<>(groupMapper.toDTO(group), HttpStatus.OK);
    }

    //endpoint which creates and returns a new group
    //only accessible when admin
    @Transactional
    @PreAuthorize("hasAuthority('USER_CREATE')")
    @PostMapping({"/", ""})
    public ResponseEntity<Group> createGroup(@Valid @RequestBody GroupDTO groupDTO) throws InstanceAlreadyExistsException {
        logger.trace("creating group with name: {}, motto: {} and logo: {}", groupDTO.getGroupName(), groupDTO.getGroupMotto(), groupDTO.getGroupLogo());
        Group group = groupMapper.fromDTO(groupDTO);
        groupService.createGroup(group);
        logger.info("created new group '{}' with id: {}", group.getGroupName(), group.getId());
        return new ResponseEntity<>(group, HttpStatus.CREATED);
    }
    //endpoint which updates specific group by ID
    //only accessible when admin
    @Transactional
    @PreAuthorize("hasAuthority('USER_MODIFY')")
    @PutMapping({"/", ""})
    public ResponseEntity<Group> updateGroup(@Valid @RequestBody GroupDTO groupDTO){
        logger.trace("updating group with id: {}", groupDTO.getId());
        Group group = groupMapper.fromDTO(groupDTO);
        Group updatedGroup = groupService.updateById(group.getId(), group);
        logger.info("updated group with id: {}", groupDTO.getId());
        return new ResponseEntity<>(updatedGroup, HttpStatus.OK);
    }
    //endpoint which deletes a group by ID
    //only accessible when admin
    @Transactional
    @PreAuthorize("hasAuthority('USER_DELETE')")
    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteGroup(@PathVariable UUID groupId) throws InstanceNotFoundException {
        logger.trace("deleting group with id: {}", groupId);
        groupService.deleteGroup(groupId);
        logger.info("group deleted");
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
