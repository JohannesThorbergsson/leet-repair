package com.github.johannesthorbergsson.backend.bikes;

import java.util.NoSuchElementException;

public class NoSuchBikeException extends NoSuchElementException {
    public NoSuchBikeException() {
        super("Bike with given id does not exist");
    }
}
