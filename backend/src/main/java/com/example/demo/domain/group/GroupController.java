package com.example.demo.domain.group;

import com.example.demo.domain.group.dto.GroupDTO;
import com.example.demo.domain.group.dto.GroupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.management.InstanceAlreadyExistsException;
import javax.management.InstanceNotFoundException;
import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@Validated
@RequestMapping("/group")
public class GroupController {
    GroupService groupService;
    GroupMapper groupMapper;
    @Autowired
    public GroupController(GroupService groupService,GroupMapper groupMapper){
        this.groupService = groupService;
        this.groupMapper = groupMapper;
    }
    @GetMapping({"", "/"})
    public ResponseEntity<List<GroupDTO>> retrieveAll(){
        List<Group> groups = groupService.findAll();
        return new ResponseEntity<>(groupMapper.toDTOs(groups), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('USER_READ') || @userPermissionEvaluator.isMemberOfGroup(groupId, authentication.principal.user)")
    @GetMapping("/{groupId}")
    public ResponseEntity<GroupDTO> retrieveGroupById(@PathVariable UUID groupId){
        Group group = groupService.findById(groupId);
        return new ResponseEntity<>(groupMapper.toDTO(group), HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('USER_CREATE')")
    @PostMapping({"/", ""})
    public ResponseEntity<Group> createGroup(@Valid @RequestBody GroupDTO groupDTO) throws InstanceAlreadyExistsException {
        Group group = groupMapper.fromDTO(groupDTO);
        groupService.createGroup(group);
        return new ResponseEntity<>(group, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('USER_MODIFY')")
    @PutMapping({"/", ""})
    public ResponseEntity<Group> editGroup(@Valid @RequestBody GroupDTO groupDTO){
        Group group = groupMapper.fromDTO(groupDTO);
        return new ResponseEntity<>(groupService.updateById(group.getId(), group), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('USER_DELETE')")
    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteGroup(@PathVariable UUID groupId){
        groupService.deleteById(groupId);
        return new ResponseEntity<>(HttpStatus.OK);
        //todo check 500 error
    }

    @ExceptionHandler(InstanceNotFoundException.class)
    public void handleInstanceNotFound(){

    }
}
