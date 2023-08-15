package project.entity;

import javax.persistence.*;

@Entity
@Table(name="computador")
public class Computador {
  @Id 
  @GeneratedValue
  private long id;
  private String marca;
  private String processador;
  private int qtdRAM;
  private int tamDisco;

  public Computador() {
  }

   public Computador(String marca, String processador, int qtdRAM, int tamDisco) {
        this.marca = marca;
        this.processador = processador;
        this.qtdRAM = qtdRAM;
        this.tamDisco = tamDisco;
    }

  
  public long getId() {
    return this.id; 
  }
  
  public String getMarca() { 
    return this.marca; 
  }

  public String getProcessador() { 
    return this.processador; 
  }

  public int getQtdRAM() {
        return qtdRAM;
    }
  public int getTamDisco() {
        return tamDisco;
    }

  public String toString() {
    return "Computador - " + "Codigo= " + id + " , Marca= '" + marca + ", Processador= " + processador + ", qtdRAM= " + qtdRAM + ", tamDisco= " + tamDisco;
  }
}