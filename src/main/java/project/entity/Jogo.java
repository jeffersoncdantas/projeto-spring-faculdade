package project.entity;

import javax.persistence.*;

@Entity
@Table(name = "jogos")
public class Jogo {
	@Id
  @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String campeonato;  
	private String timeA;
	private String timeB;
	private int golsTimeA;
	private int golsTimeB;
    
    @ManyToOne(fetch=FetchType.EAGER, optional=false)
    private Empregado empregado;
    
    @ManyToOne(fetch=FetchType.EAGER, optional=false)
    private Computador computador;
    
    
    public Jogo(){
        
    }
	
	public Jogo(String campeonato, String timeA, String timeB, int golsTimeA, int golsTimeB, Empregado empregado, Computador computador) {
		this.campeonato = campeonato;
        this.timeA = timeA;
		this.timeB = timeB;
		this.golsTimeA = golsTimeA;
		this.golsTimeB = golsTimeB;
        this.empregado = empregado;
        this.computador = computador;
	}


	public long getId() {
		return id;
	}

  public String getCampeonato(){
    return campeonato;
  }

	public String getTimeA() {
		return timeA;
	}


	public String getTimeB() {
		return timeB;
	}


	public int getGolsTimeA() {
		return golsTimeA;
	}


	public int getGolsTimeB() {
		return golsTimeB;
	}
    
    public Empregado getEmpregado(){
        return empregado;
    }
    
    public void setEmpregado(Empregado empregado){
        this.empregado = empregado;
    }
    
    public Computador getComputador(){
        return computador;
    }
    
    public void setComputador(Computador computador){
        this.computador = computador;
    }

	@Override
	public String toString() {
		return "Jogo [Codigo=" + id + ", Campeonato=" + campeonato + ", Time A=" + timeA + ", Time B=" + timeB + ", Gols Time A=" + golsTimeA
				+ ", Gols Time B=" + golsTimeB + ", Empregado " + empregado + ", Computador " + computador + "]";
	}
}