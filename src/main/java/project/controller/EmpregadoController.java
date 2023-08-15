package project.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.server.*;
import java.util.Map;

import project.entity.Empregado;
import project.repository.EmpregadoRepository;

@RestController
@RequestMapping(value = "/api")
public class EmpregadoController{
  @Autowired
  private EmpregadoRepository repository;

  @GetMapping("/empregados")
  public List<Empregado> getEmpregados() {
    return repository.findAll();
  }

  @GetMapping(value = "/empregados/{id}")
  public Optional<Empregado> getEmpregado(@PathVariable long id){
      Optional<Empregado> opt = repository.findById(id);
      
      if(opt.isPresent()){
          return opt;
      } throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro ao buscar jogo com o id " + id);
  }

  @PostMapping("/empregados")
  public Empregado postEmpregado(@RequestBody Empregado empregado) {
    return repository.save(empregado);
  }

  @PutMapping("/empregados/{id}")
  public Optional<Empregado> updateEmpregado(@RequestBody Empregado empregado, @PathVariable(value = "id") long empregadoId){
    Optional<Empregado> opt = repository.findById(empregadoId);
    if (opt.isPresent() && opt.get().getId() == empregado.getId()) {
      return Optional.of(repository.save(empregado));
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro ao alterar os dados do empregado com id " + empregadoId);
  }

  @DeleteMapping("/empregados/{id}")
  public void deleteEmpregado(@PathVariable long id){
      if(repository.findById(id) == null){
           throw new ResponseStatusException(HttpStatus.NOT_FOUND, "O servidor não encontrou nada que corresponda ao request.");
      }
    repository.deleteById(id);
  }

  @RequestMapping(value="/empregados" , params="cargo", method= RequestMethod.GET)
  public ResponseEntity<List<Empregado>> getByCargo(@RequestParam("cargo") String cargo){
    List<Empregado> empregados = repository.findByCargoStartingWith(cargo);
    if(empregados.isEmpty()){
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(empregados);
  }
}