package com.example.demo.domain.user.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.UUID;

public class JoinGroupDTO{
    @Min(1)
    @Max(60)
    private UUID userId;
    @Min(1)
    @Max(60)
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
