package com.github.johannesthorbergsson.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final String TIMESTAMP = "Timestamp";
    private static final String MESSAGE = "message";

    @ExceptionHandler(NoSuchBikeException.class)
    public ResponseEntity<Map<String, Object>> handleNoSuchBikeException(NoSuchBikeException exception) {
        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put(TIMESTAMP, Instant.now());
        responseBody.put(MESSAGE, exception.getMessage());
        return new ResponseEntity<>(responseBody, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(NoSuchOrderException.class)
    public ResponseEntity<Map<String, Object>> handleNoSuchOrderException(NoSuchOrderException exception) {
        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put(TIMESTAMP, Instant.now());
        responseBody.put(MESSAGE, exception.getMessage());
        return new ResponseEntity<>(responseBody, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<Map<String, Object>> handleUnauthorizedAccessException(UnauthorizedAccessException exception) {
        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put(TIMESTAMP, Instant.now());
        responseBody.put(MESSAGE, exception.getMessage());
        return new ResponseEntity<>(responseBody, HttpStatus.FORBIDDEN);
    }
}
