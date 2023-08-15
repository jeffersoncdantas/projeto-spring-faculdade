package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

import project.entity.Empregado;

public interface EmpregadoRepository extends JpaRepository<Empregado, Long>{
  List<Empregado> findByCargoStartingWith(String cargo);
}