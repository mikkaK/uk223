package com.example.demo;

import com.example.demo.domain.group.GroupController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(GroupController.class)
@ContextConfiguration(locations ="/test-context.xml")
public class DummyTest {
    @Autowired
    private MockMvc mvc;

    @Test
    public void dummyTest() throws Exception {

        mvc.perform(get("/group/")
                .contentType(MediaType.ALL))
                .andExpect(status().isUnauthorized());
    }
}
