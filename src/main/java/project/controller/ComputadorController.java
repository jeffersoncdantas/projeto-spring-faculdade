package project.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.server.*;

import project.entity.Computador;
import project.repository.ComputadorRepository;

@RestController
@RequestMapping(value = "/api")
public class ComputadorController {
  @Autowired
  private ComputadorRepository repository;

  public ComputadorController (){}

  @GetMapping("/computadores")
  public List<Computador> getComputadores() {
      return repository.findAll();
  }

  @GetMapping("/computadores/{id}")
  public Optional<Computador> getComputador(@PathVariable long id) {
      Optional<Computador> opt = repository.findById(id);
      
      if(opt.isPresent()){
          return opt;
      } throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro ao buscar computador com id " + id);
  } 

  @PostMapping("/computadores")
  public Computador postComputador(@RequestBody Computador computador) {
      return repository.save(computador);
  }

  @PutMapping("/computadores/{computadorId}")
  public Optional<Computador> updateComputador(@RequestBody Computador computador, @PathVariable(value= "computadorId") long computadorId){
    Optional<Computador> opt = this.getComputador(computadorId);
    if (opt.isPresent() && opt.get().getId() == computador.getId()){
      return Optional.of(repository.save(computador));
    } throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro ao alterar dados do computador com id" + computadorId);
  }

    
  @DeleteMapping(value = "/computadores/{id}")
  public void deleteComputador(@PathVariable long id){
    if(repository.findById(id) == null){
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "O servidor não encontrou nada que corresponda ao request.");
    }
    repository.deleteById(id);
  }

 @RequestMapping(value="/computadores", params="marca", method= RequestMethod.GET)
 public ResponseEntity<List<Computador>> getByMarca(@RequestParam("marca") String marca){
     List<Computador> computadores = repository.findByMarcaStartingWith(marca);
     if(computadores.isEmpty()){
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro ao buscar computadores com a marca " + marca);
     }
   return ResponseEntity.ok(computadores);
 }
    
}