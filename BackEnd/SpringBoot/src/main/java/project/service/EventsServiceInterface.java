package project.service;

import project.models.ClothesEntity;
import project.models.Events;

import java.util.List;

public interface EventsServiceInterface {
    Events AddEvents(int userId, Events events);

    List<Events> getAllEvents();

    void deleteEvents(Long id);

    Events updateEventsPut(Long id, Events events);

    List<Events> getEventsByUserId(int userId);

    Events getEventsById(Long id);
}
