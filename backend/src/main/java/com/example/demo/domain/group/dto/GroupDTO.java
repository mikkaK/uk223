package com.example.demo.domain.group.dto;

import com.example.demo.core.generic.ExtendedDTO;

import java.util.UUID;

public class GroupDTO extends ExtendedDTO {

    private String groupName;

    private String groupMotto;

    private String groupLogo;


    public GroupDTO(){}

    public GroupDTO(UUID id, String groupName, String groupMotto, String groupLogo){
        super(id);
        this.groupName = groupName;
        this.groupMotto = groupMotto;
        this.groupLogo = groupLogo;
    }

    public String getGroupName() {
        return groupName;
    }

    public GroupDTO setGroupName(String groupName) {
        this.groupName = groupName;
        return this;
    }

    public String getGroupMotto() {
        return groupMotto;
    }

    public GroupDTO setGroupMotto(String groupMotto) {
        this.groupMotto = groupMotto;
        return this;
    }

    public String getGroupLogo() {
        return groupLogo;
    }

    public GroupDTO setGroupLogo(String groupLogo) {
        this.groupLogo = groupLogo;
        return this;
    }
}
