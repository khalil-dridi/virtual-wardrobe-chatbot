package project.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.models.ClothesEntity;
import project.models.Events;
import project.models.UserEntity;
import project.repository.ClothesRepository;
import project.repository.EventsRepository;
import project.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service

public class EventsServiceImplementation implements EventsServiceInterface{
    @Autowired
    EventsRepository eventsRepository;
    @Autowired
    UserRepository userRepository;


    @Override
    public Events AddEvents(int userId, Events events) {
        Optional<UserEntity> user = userRepository.findById(userId);
        if (user.isPresent()) {

            events.setUser(user.get());

            return eventsRepository.save(events);

        } else {
            throw new IllegalArgumentException("User Not found");
        }


    }

    @Override
    public List<Events> getAllEvents() {
        return eventsRepository.findAll();
    }

    @Override
    public void deleteEvents(Long id) {
        eventsRepository.deleteById(id);
    }

    @Override
    public Events updateEventsPut(Long id, Events events) {
        Events ev = eventsRepository.findById(id).get();
        ev.setDate(events.getDate());
        ev.setTitle(events.getTitle());
        ev.setMonth(events.getMonth());
        ev.setColor(events.getColor());
        ev.setYear(events.getYear());

        return eventsRepository.save(ev);
    }

    @Override
    public List<Events> getEventsByUserId(int userId) {
        return eventsRepository.findByUserId(userId);
    }

    @Override
    public Events getEventsById(Long id) {
        return eventsRepository.findById(id).orElse(null);
    }
}
