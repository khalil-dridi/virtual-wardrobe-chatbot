package project.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.models.ClothesEntity;
import project.repository.ClothesRepository;
import project.service.ClothesServiceImplementation;
import project.service.ClothesServiceInterface;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/clothes")
public class ClothesControlles {

    @Autowired
    ClothesServiceInterface clothesServiceInterface;
    @Autowired
    ClothesRepository clothesRepository;

    @PostMapping(value = "add" , consumes = {"multipart/form-data"})
    public ResponseEntity<ClothesEntity> addClothes(@RequestPart("clothes") String clothesJson,
                                             @RequestPart("image") MultipartFile image) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> clothes = objectMapper.readValue(clothesJson, Map.class);


        String name = (String) clothes.get("name");
        String description = (String) clothes.get("description");
        String category = (String) clothes.get("category");
        Integer idUser= (Integer) clothes.get("id");
        String path="C:\\Users\\MSI\\Downloads\\frontKhalil-main\\frontKhalil-main\\src\\assets\\images";
        Files.copy(image.getInputStream(), Paths.get(path+ File.separator+image.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
        String imageName = image.getOriginalFilename();
        return clothesServiceInterface.addClothes(name,description,category,imageName,idUser);

    }

    @DeleteMapping(value = "/delete/{id}")
    public void deleteClothes(@PathVariable Long id) {
        clothesServiceInterface.deleteClothes(id);
    }

    @PutMapping(value = "/update/{id}",consumes = {"multipart/form-data"})
    public ClothesEntity updateClothesPut(@PathVariable Long id,@RequestPart("clothes") String clothesJson,
                                          @RequestPart("image") MultipartFile image) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> clothes = objectMapper.readValue(clothesJson, Map.class);

        String name = (String) clothes.get("name");
        String description = (String) clothes.get("description");
        String category = (String) clothes.get("category");
        String path="C:\\Users\\MSI\\Downloads\\frontKhalil-main\\frontKhalil-main\\src\\assets\\images";
        Files.copy(image.getInputStream(), Paths.get(path+ File.separator+image.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
        String imageName = image.getOriginalFilename();
        return clothesServiceInterface.updateClothesPut(id,name,description,category,imageName);

    }


    @PostMapping("addP/{userId}")

    public ClothesEntity AddClothes(@PathVariable int userId, @RequestBody ClothesEntity clothes) {
        return clothesServiceInterface.AddClothes(userId, clothes);
    }


    @GetMapping("/getAll/{id}")
    public List<ClothesEntity> getAllClothes(@PathVariable Long id) {
        return clothesServiceInterface.getAllClothes(id);

    }


    @GetMapping("get/{id}")
    public ClothesEntity getClothesById(@PathVariable Long id) {
        return clothesServiceInterface.getClothesById(id);


    }

    @GetMapping("/user/{userId}")
    public List<ClothesEntity> getClothesByUserId(@PathVariable int userId) {
        return clothesServiceInterface.getClothesByUserId(userId);

    }

    @PutMapping("/update/{clothesId}")
    public ClothesEntity updateClothes(@PathVariable Long clothesId, @RequestBody ClothesEntity updatedClothes) {
        return clothesServiceInterface.updateClothes(clothesId, updatedClothes);

    }
}


