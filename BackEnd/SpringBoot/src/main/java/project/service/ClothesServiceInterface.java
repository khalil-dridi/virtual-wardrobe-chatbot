package project.service;

import org.springframework.http.ResponseEntity;
import project.models.ClothesEntity;

import java.util.List;

public interface ClothesServiceInterface {

    ClothesEntity addClothes(ClothesEntity clothes);
    void deleteClothes(Long id);
    ClothesEntity updateClothesPut(Long id ,String name,String description,String category,String imageName) ;
    ClothesEntity AddClothes (int userId,ClothesEntity clothes);
    List<ClothesEntity> getAllClothes(Long id);
    ClothesEntity getClothesById(Long id);
    List<ClothesEntity> getClothesByUserId(int userId);
    ClothesEntity updateClothes(Long clothesId, ClothesEntity updatedClothes);


    ResponseEntity<ClothesEntity> addClothes(String name, String description, String category,String imageName, Integer idUser);
}



