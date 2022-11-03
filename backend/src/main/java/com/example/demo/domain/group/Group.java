package com.example.demo.domain.group;

import com.example.demo.core.generic.ExtendedEntity;
import com.example.demo.domain.user.User;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "groups")
public class Group extends ExtendedEntity {
    @Size(min = 1, max = 100)
    @Column(name = "group_name")
    private String groupName;
    @Size(min = 1, max = 100)
    @Column(name = "group_motto")
    private String groupMotto;
    @Size(min = 1, max = 255)
    @Column(name = "group_logo")
    private String groupLogo;

    @OneToMany(mappedBy="group")
    private Set<User> members;
    public Group() {
    }

    public Group(UUID id, String groupName, String groupMotto, String groupLogo) {
        super(id);
        this.groupName = groupName;
        this.groupMotto = groupMotto;
        this.groupLogo = groupLogo;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getGroupMotto() {
        return groupMotto;
    }

    public void setGroupMotto(String groupMotto) {
        this.groupMotto = groupMotto;
    }

    public String getGroupLogo() {
        return groupLogo;
    }

    public void setGroupLogo(String groupLogo) {
        this.groupLogo = groupLogo;
    }

    public Set<User> getMembers() {
        return members;
    }

    public void setMembers(Set<User> members) {
        this.members = members;
    }
}
