package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.HtmlUtils;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {
    @Autowired
    private MessageRepository messageRepository;

    @PostMapping
    public String addMessage(@RequestBody Message message) {
        // Sanitize input
        String sanitized = HtmlUtils.htmlEscape(message.getContent());
        messageRepository.save(sanitized);
        return "Message stored: " + sanitized;
    }

    @GetMapping
    public List<Message> getMessages() {
        return messageRepository.findAll();
    }
} 