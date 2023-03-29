package com.github.johannesthorbergsson.backend.exceptions;

import java.util.NoSuchElementException;

public class UnauthorizedAccessException extends NoSuchElementException {
    public UnauthorizedAccessException() {
        super("Access unauthorized");
    }
}
