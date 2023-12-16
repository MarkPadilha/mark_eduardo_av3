package com.example.getped;

public class Funcionarios {
    private String nome_funcionario = "";
    private String login = "";
    private String senha = "";

        public String getLogin(){
            return this.login;
        }

        public String getNome(){
            return this.nome_funcionario;
        }

        public String getSenha(){
            return this.senha;
        }

        public void setNome(String nome){
            this.nome_funcionario = nome;
        }

        public void setSenha(String senha){
            this.senha = senha;
        }
}
