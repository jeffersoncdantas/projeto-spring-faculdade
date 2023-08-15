package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.entity.Computador;

import java.util.*;

public interface ComputadorRepository extends JpaRepository<Computador, Long> {
  List<Computador> findByMarcaStartingWith(String texto);
  
}
