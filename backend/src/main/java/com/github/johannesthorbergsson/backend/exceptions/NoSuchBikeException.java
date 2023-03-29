package com.github.johannesthorbergsson.backend.exceptions;

import java.util.NoSuchElementException;

public class NoSuchBikeException extends NoSuchElementException {
    public NoSuchBikeException() {
        super("Bike with given ID does not exist");
    }
}
