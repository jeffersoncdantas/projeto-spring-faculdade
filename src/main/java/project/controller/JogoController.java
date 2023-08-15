package project.controller;

import java.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.server.*;


import project.entity.Jogo;
import project.repository.JogoRepository;

@RestController
@RequestMapping(value = "/api")
public class JogoController {
  @Autowired
  private JogoRepository repository;

  public JogoController (){}

  @GetMapping("/jogos")
  public List<Jogo> getJogos() {
      return repository.findAll();
  }

  @GetMapping("/jogos/{id}")
  public Optional<Jogo> getJogo(@PathVariable long id) {
      Optional<Jogo> opt = repository.findById(id);
      
      if(opt.isPresent()){
          return opt;
      } throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro ao buscar jogo com o id " + id);
  } 

  @PostMapping("/jogos")
  public Jogo postJogo(@RequestBody Jogo jogo) {
      return repository.save(jogo);
  }

  @PutMapping("/jogos/{jogoId}")
  public Optional<Jogo> updateJogo(@RequestBody Jogo jogo, @PathVariable(value="jogoId") long jogoId){
    Optional<Jogo> opt = this.getJogo(jogoId);
    if (opt.isPresent() && opt.get().getId() == jogo.getId()){
      return Optional.of(repository.save(jogo));
    } throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro ao alterar dados do jogo com id" + jogoId);
  }
    
  @DeleteMapping(value = "/jogos/{id}")
  public void deleteJogo(@PathVariable long id){
      if(repository.findById(id) == null){
          throw new ResponseStatusException(HttpStatus.NOT_FOUND, "O servidor não encontrou nada que corresponda ao request.");
      }
    repository.deleteById(id);
  }
    
 @RequestMapping(value="/jogos" , params="campeonato", method= RequestMethod.GET)
 public ResponseEntity<List<Jogo>> getByCampeonato(@RequestParam("campeonato") String campeonato){
     List<Jogo> campeonatos = repository.findByCampeonatoStartingWith(campeonato);
     if(campeonatos.isEmpty()){
         return ResponseEntity.notFound().build();
     }
     return ResponseEntity.ok(campeonatos);
 }
    
}