package project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import project.models.Category;
import project.models.ClothesEntity;
import project.models.UserEntity;
import project.repository.ClothesRepository;
import project.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service

public class ClothesServiceImplementation implements ClothesServiceInterface {
    @Autowired
    ClothesRepository clothesRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public ClothesEntity addClothes(ClothesEntity Clothes) {
        return clothesRepository.save(Clothes);
    }

    @Override
    public void deleteClothes(Long id) {
        clothesRepository.deleteById(id);
    }

    @Override
    public ClothesEntity updateClothesPut(Long id,String name,String description,String category,String imageName)  {
        ClothesEntity cls = clothesRepository.findById(id).get();
        cls.setName(name);
        cls.setImageName(imageName);
        cls.setCategory(Category.valueOf(category));
        cls.setDescription(description);

        return clothesRepository.save(cls);
    }




    @Override
    public ClothesEntity AddClothes(int userId, ClothesEntity clothes) {
        Optional<UserEntity> user = userRepository.findById(userId);
        if (user.isPresent()) {

            clothes.setUser(user.get());

            return clothesRepository.save(clothes);

        } else {
            throw new IllegalArgumentException("User Not found");
        }


    }

    @Override
    public List<ClothesEntity> getAllClothes(Long id) {

        return clothesRepository.findByUserId(Math.toIntExact(id));
    }


    @Override
    public ClothesEntity getClothesById(Long id) {

        return clothesRepository.findById(id).orElse(null);
    }


    @Override
    public List<ClothesEntity> getClothesByUserId(int userId) {
        return clothesRepository.findByUserId(userId);
    }


    @Override
    public ClothesEntity updateClothes(Long clothesId, ClothesEntity updatedClothes) {
        ClothesEntity existingClothes = clothesRepository.findById(clothesId).orElse(null);
        if (existingClothes != null) {
            existingClothes.setName(updatedClothes.getName());
            existingClothes.setDescription(updatedClothes.getDescription());
            return clothesRepository.save(existingClothes);
        } else {
            return null;
        }

    }

    @Override
    public ResponseEntity<ClothesEntity> addClothes(String name, String description, String category,String imageName, Integer idUser) {
        ClothesEntity clothes=new ClothesEntity();
        clothes.setDescription(description);
        clothes.setCategory(Category.valueOf(category));
        clothes.setName(name);
        clothes.setImageName(imageName);
        Optional<UserEntity>user=  userRepository.findById(idUser);
        if(user.isPresent())
        clothes.setUser(user.get());
        clothesRepository.save(clothes);
        return ResponseEntity.ok(clothes);
    }

}





