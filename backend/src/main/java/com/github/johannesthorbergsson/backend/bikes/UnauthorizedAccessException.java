package com.github.johannesthorbergsson.backend.bikes;

import java.util.NoSuchElementException;

public class UnauthorizedAccessException extends NoSuchElementException {
    public UnauthorizedAccessException() {
        super("Access unauthorized");
    }
}
