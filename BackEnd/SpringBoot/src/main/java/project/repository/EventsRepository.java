package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.models.ClothesEntity;
import project.models.Events;

import java.util.List;

@Repository

public interface EventsRepository extends JpaRepository<Events,Long>{
    List<Events> findByUserId(int userId);
}
