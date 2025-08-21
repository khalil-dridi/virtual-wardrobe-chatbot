package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.models.UserRole;
import project.models.UserRoleName;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<UserRole,Integer> {


    Optional<UserRole> findByUserRoleName(UserRoleName userRoleName);
}
