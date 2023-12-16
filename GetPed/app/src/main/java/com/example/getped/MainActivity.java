package com.example.getped;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import com.android.volley.Request;
import java.util.concurrent.atomic.AtomicReference;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;



public class MainActivity extends AppCompatActivity {

    //quando iniciar o ap
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.painel_login);
    }

    public void onBackPressed() {
        super.onBackPressed();
    }

    String resultadoAPI="";

    //puxar atividade principal
    public void puxarActivityMain(){
        setContentView(R.layout.activity_main);
    }

    public void mensagem_erro_tela(String erro){
        AlertDialog.Builder alert = new AlertDialog.Builder(this);
        alert.setMessage(erro);
        AlertDialog alertCriado = alert.create();
        alertCriado.show();
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                if (alertCriado.isShowing()){
                    alertCriado.dismiss();
                }
            }
        },3000);
    }
    public void mensagem_tela(String nome){
        AlertDialog.Builder alert = new AlertDialog.Builder(this);
        alert.setMessage("Olá "+nome+" seja bem vindo ao sistema");
        AlertDialog alertCriado = alert.create();

        AlertDialog.Builder buscandopedidos = new AlertDialog.Builder(this);
        buscandopedidos.setMessage("Puxando pedidos no banco de dados...");
        AlertDialog buscando_pedidos = buscandopedidos.create();

        buscando_pedidos.show();

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                if (buscando_pedidos.isShowing()){
                    buscando_pedidos.dismiss();
                }
            }
        },3500);

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                alertCriado.show();
            }
        },3501);

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                if (alertCriado.isShowing()){
                    alertCriado.dismiss();
                }
            }
        },5500);
    }

    private void excluirPedido(int pedidoId) {
        Log.d("DEBUG", "Iniciando exclusão do pedido com ID: " + pedidoId);

        RequestQueue queue = Volley.newRequestQueue(this);
        String url = "http://192.168.1.19:3000/" + pedidoId + "/deletepedido";

        StringRequest deleteRequest = new StringRequest(Request.Method.DELETE, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.d("DEBUG", "Exclusão bem-sucedida. Resposta: " + response);
                        // Lógica após a exclusão bem-sucedida do pedido
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.e("ERROR", "Erro na exclusão do pedido. Mensagem de erro: " + error.getMessage());
                        // Lógica em caso de erro na exclusão do pedido
                    }
                });

        queue.add(deleteRequest);
    }

    private void inverterAtendimento(int pedidoId) {
        RequestQueue queue = Volley.newRequestQueue(this);
        String url = "http://192.168.1.19:3000/" + pedidoId + "/atendimento_invert";

        StringRequest invertRequest = new StringRequest(Request.Method.PUT, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {

                    }
                });

        queue.add(invertRequest);
    }

    private void atualizarInterfaceUsuario() {
        buscarDadosDoServidor();
    }

    private void processarRespostaDoServidor(JSONObject response) {
        try {
            if (response != null && response.has("data")) {
                JSONArray jsonArray = response.getJSONArray("data");

                LinearLayout linearLayoutYesAtendimento = findViewById(R.id.linearYesAtendimento);
                LinearLayout linearLayoutNoAtendimento = findViewById(R.id.linearNoAtendimento);

                linearLayoutYesAtendimento.removeAllViews();
                linearLayoutNoAtendimento.removeAllViews();

                AtomicReference<TextView> lastSelectedTextView = new AtomicReference<>(null);

                // Configuração do ouvinte de clique para o botão de exclusão
                Button btnExcluirPedido = findViewById(R.id.exclrTextView);
                btnExcluirPedido.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        // Recupera o ID do pedido do TextView selecionado
                        TextView lastSelected = lastSelectedTextView.get();
                        if (lastSelected != null) {
                            int idPedido = (int) lastSelected.getTag();

                            // Chama o método para excluir o pedido
                            excluirPedido(idPedido);

                            new Handler().postDelayed(new Runnable() {
                                @Override
                                public void run() {
                                    atualizarInterfaceUsuario();
                                }
                            },1000);
                        }
                    }
                });

                // Configuração do ouvinte de clique para o botão de inverter atendimento
                Button btnInverterAtendimento = findViewById(R.id.btnStatus);
                btnInverterAtendimento.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        // Recupera o ID do pedido do TextView selecionado
                        TextView lastSelected = lastSelectedTextView.get();
                        if (lastSelected != null) {
                            int idPedido = (int) lastSelected.getTag();

                            Log.d("DEBUG", "ID do pedido ao inverter atendimento: " + idPedido);

                            // Chama o método para inverter o atendimento
                            inverterAtendimento(idPedido);

                            new Handler().postDelayed(new Runnable() {
                                @Override
                                public void run() {
                                    atualizarInterfaceUsuario();
                                }
                            },1000);

                        }
                    }
                });

                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject pedidoJson = jsonArray.getJSONObject(i);
                    TextView novoTextView = new TextView(getApplicationContext());

                    // Usando o ID do pedido como tag no TextView
                    int idPedido = pedidoJson.getInt("pedido_id");

                    Log.d("DEBUG", "ID do pedido: " + idPedido);

                    String infoPedido = "Nome do Prato: " + pedidoJson.getString("Nome do prato") +
                            "\nNome do Cliente: " + pedidoJson.getString("Nome do cliente") +
                            "\nEm Atendimento: " + (pedidoJson.getInt("Em atendimento") == 1 ? "Sim" : "Não") +
                            "\nData/Hora do Pedido: " + pedidoJson.getString("Data/Hora pedido") +
                            "\nNúmero da Mesa: " + pedidoJson.getInt("Número da mesa");

                    novoTextView.setText(infoPedido);

                    // Usando o ID do pedido como tag no TextView
                    novoTextView.setTag(idPedido);

                    novoTextView.setBackgroundColor(Color.parseColor("#2196F3"));
                    novoTextView.setTextColor(Color.BLACK);

                    novoTextView.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            // Desmarca o último TextView selecionado
                            TextView lastSelected = lastSelectedTextView.get();
                            if (lastSelected != null) {
                                lastSelected.setBackgroundColor(Color.parseColor("#2196F3"));
                                lastSelected.setSelected(false);
                            }

                            // Define a lógica para tratar o clique no TextView selecionado
                            view.setBackgroundColor(Color.parseColor("#FF4081"));
                            view.setSelected(true);

                            // Atualiza o último TextView selecionado
                            lastSelectedTextView.set((TextView) view);
                        }
                    });

                    LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(
                            LinearLayout.LayoutParams.MATCH_PARENT,
                            LinearLayout.LayoutParams.WRAP_CONTENT
                    );

                    if (i == 0) {
                        layoutParams.setMargins(9, 9, 9, 0);
                    } else {
                        layoutParams.setMargins(9, 9, 9, 0);
                    }

                    novoTextView.setLayoutParams(layoutParams);

                    if (pedidoJson.getInt("Em atendimento") == 1) {
                        linearLayoutYesAtendimento.addView(novoTextView);
                    } else {
                        linearLayoutNoAtendimento.addView(novoTextView);
                    }
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void buscarDadosDoServidor() {
        RequestQueue queue = Volley.newRequestQueue(this);
        String url = "http://192.168.1.19:3000/allpedido_prato";

        JsonObjectRequest getJson = new JsonObjectRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        processarRespostaDoServidor(response);
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        mensagem_erro_tela(error.getMessage());
                    }
                });

        queue.add(getJson);
    }


    //=============================================================================================

    //Quando clica no botão
public void Login(View view) {
   //puxando os insert do usuário na tela de login
   EditText getLogin = (EditText) findViewById(R.id.inputName_Functionary);
   EditText getPassword = (EditText) findViewById(R.id.inputPassword_Functionary);
   String login = getLogin.getText().toString();
   String senha = getPassword.getText().toString();

if (!login.isEmpty() && !senha.isEmpty()){
  Funcionarios funcionario = new Funcionarios();
  funcionario.setNome(login);
  funcionario.setSenha(senha);

try {

   RequestQueue queue = Volley.newRequestQueue(this);


   String url = "http://192.168.1.19:3000/"+login+"/"+senha;
   StringRequest a = new StringRequest(Request.Method.GET, url,
     new Response.Listener<String>() {
        @Override
        public void onResponse(String returnGet) {
        if(returnGet.isEmpty()){
            mensagem_erro_tela("Não foi possível validar as credenciais de login, " +
            "tente novamente");
        }else{
           //returnGet string com nome do funcionário
            mensagem_tela(returnGet);

        //se estiver tudo certo
            new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                //Após validação, puxar a tela de PEDIDOS e o método de request ======================================
                    puxarActivityMain();
                    buscarDadosDoServidor();


                  //botão de atualizar a tela
                   Button btnAtualizar = findViewById(R.id.btnAtualizar);
                    btnAtualizar.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        atualizarInterfaceUsuario();
                    }
                });
               }
               },5200);

                }
             }
            },
                new Response.ErrorListener() {
                  @Override
                  public void onErrorResponse(VolleyError error) {
                      mensagem_erro_tela(error.getMessage());
                  }
                });

                queue.add(a);
            }catch (Exception e) {
                mensagem_erro_tela("Sem conexão com o servidor: " + e.getMessage());
            }

        }else{
            AlertDialog.Builder preenchatodos = new AlertDialog.Builder(this);
            preenchatodos.setMessage("Por favor, preencha todos os campos");
            AlertDialog preencha_todos = preenchatodos.create();
            preencha_todos.show();
        }


    }


}