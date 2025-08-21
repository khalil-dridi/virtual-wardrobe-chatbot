package project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.models.ClothesEntity;
import project.models.Events;
import project.repository.EventsRepository;
import project.service.EventsServiceInterface;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/events")

public class EventsContoller {
    @Autowired
    EventsServiceInterface eventsServiceInterface ;

    @Autowired
    EventsRepository eventsRepository ;


    @PostMapping("add/{userId}")

    public Events AddEvents(@PathVariable int userId, @RequestBody Events events) {
        return eventsServiceInterface.AddEvents(userId, events);
    }


    @GetMapping("/all")
    public List<Events> getAllEvents() {
        return eventsServiceInterface.getAllEvents();

    }

    @DeleteMapping(value = "/delete/{id}")
    public void deleteEvents(@PathVariable Long id) {
        eventsServiceInterface.deleteEvents(id);
    }

    @PutMapping(value = "/update/{id}")
    public Events updateEventsPut(@PathVariable Long id, @RequestBody Events events) {
        return eventsServiceInterface.updateEventsPut(id, events);

    }

    @GetMapping("/getAll/{userId}")
    public List<Events> getEventsByUserId(@PathVariable int userId) {
        return eventsServiceInterface.getEventsByUserId(userId);

    }

    @GetMapping("get/{id}")
    public Events getEventsById(@PathVariable Long id) {
        return eventsServiceInterface.getEventsById(id);


    }

}
