package com.github.johannesthorbergsson.backend.exceptions;

import java.util.NoSuchElementException;

public class NoSuchOrderException extends NoSuchElementException {
    public NoSuchElementException() {
        super("Order with given ID does not exist")
    }
}
