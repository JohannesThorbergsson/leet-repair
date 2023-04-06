package com.github.johannesthorbergsson.backend.exceptions;

import java.util.NoSuchElementException;

public class NoSuchWorkshopException extends NoSuchElementException {
    public NoSuchWorkshopException(){
        super("Workshop with given ID does not exist");
    }
}
