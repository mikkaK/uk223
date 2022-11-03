package com.example.demo.domain.group;

import com.example.demo.domain.group.dto.GroupDTO;
import com.example.demo.domain.group.dto.GroupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/user/{id}")
    public ResponseEntity<GroupDTO> retrieveById(@PathVariable UUID id) throws InstanceNotFoundException {
        Group group = groupService.findByUserId(id);
        return new ResponseEntity<>(groupMapper.toDTO(group), HttpStatus.OK);
    }
}
