package com.example.demo.domain.group;

import com.example.demo.domain.group.dto.GroupDTO;
import com.example.demo.domain.group.dto.GroupMapper;
import com.example.demo.domain.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.management.InstanceAlreadyExistsException;
import javax.management.InstanceNotFoundException;
import java.util.List;
import java.util.Optional;
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
        return new ResponseEntity<>(groupMapper.toDTOs(groups), HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<GroupDTO> retrieveById(@PathVariable UUID userId) throws InstanceNotFoundException {
        Group group = groupService.findByUserId(userId);
        return new ResponseEntity<>(groupMapper.toDTO(group), HttpStatus.OK);
    }

    @PostMapping({"/", ""})
    public ResponseEntity<Group> createGroup(@RequestBody GroupDTO groupDTO) throws InstanceAlreadyExistsException {
        Group group = groupMapper.fromDTO(groupDTO);
        return new ResponseEntity<>(groupService.createGroup(group), HttpStatus.OK);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteGroup(@PathVariable UUID groupId){
        groupService.deleteById(groupId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
