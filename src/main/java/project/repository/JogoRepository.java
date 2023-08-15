package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

import project.entity.Jogo;

public interface JogoRepository extends JpaRepository<Jogo, Long> {
  List<Jogo> findByCampeonatoStartingWith(String campeonato);
}
