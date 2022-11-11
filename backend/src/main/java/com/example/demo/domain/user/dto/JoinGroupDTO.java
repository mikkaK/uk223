package com.example.demo.domain.user.dto;

import java.util.UUID;

public class JoinGroupDTO{
    private UUID userId;
    private UUID groupId;

    public JoinGroupDTO(UUID userId, UUID groupId) {
        this.userId = userId;
        this.groupId = groupId;
    }

    public UUID getUserId() {
        return userId;
    }

    public JoinGroupDTO setUserId(UUID userId) {
        this.userId = userId;
        return this;
    }

    public UUID getGroupId() {
        return groupId;
    }

    public JoinGroupDTO setGroupId(UUID groupId) {
        this.groupId = groupId;
        return this;
    }
}
