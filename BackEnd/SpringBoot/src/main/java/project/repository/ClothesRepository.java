package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.models.ClothesEntity;

import java.util.List;

@Repository
public interface ClothesRepository extends JpaRepository<ClothesEntity,Long> {
    List<ClothesEntity> findByUserId(int userId);


}
