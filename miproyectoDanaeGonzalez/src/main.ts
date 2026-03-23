import { createClient } from '@supabase/supabase-js';
/**
 * PASO 1: DATOS PRIMITIVOS (Configuración base)
 * Definimos valores básicos con tipado explícito para que el compilador sepa 
 * exactamente qué tipo de datos estamos manejando desde el inicio.
 */
//URL-STRING ¡ESTE ES EL SERVIDOR!
const API_URL: string = "https://jsonplaceholder.typicode.com"; 

//ID - NUMBER .El ID que usaremos para las pruebas.¡EL POST Q TRAEMOS!
const POST_ID_TO_SEARCH: number = 1; 
//AQUI TRAEMOS EL POST, EL NUMERO ES 1, PERO PODEMOS LLAMAR AL 100
//FORMA 2: fetchSinglePost(100);

//BOOL- ESTADO. Mensajes de log detallados.
const IS_DEBUG_MODE: boolean = true; 

/**
 * PASO 2: INTERFACES (El contrato de datos)
 * Creamos una interfaz 'Post'. Esto no genera código JS, es una guía para TS
 * que define la estructura exacta que esperamos recibir de la API.
 */
interface Post {
  userId: number;   // ID del autor (numérico)
  id: number;       // ID único del post (numérico)
  title: string;    // Título del post (texto)
  body: string;     // Contenido del post (texto)
}

/**
 * PASO 3: FUNCIÓN PARA OBTENER DATOS (GET)
 * Usamos 'async' para indicar que la función maneja procesos de llamadas a APIS.
 * 'Promise<void>' indica que la función no retorna un valor, sino una promesa vacía.
 */
const fetchSinglePost = async (id: number): Promise<void> => {  
  // Aplicamos un estilo visual a la consola si estamos en modo debug.
  // MODO DEBUG IDENTIFICA-LOCALIZA-CORRIGE ERRORES
  if (IS_DEBUG_MODE) {
    console.log(`%c [LAB 1] Buscando post con ID: ${id}...`, "color: cyan; font-weight: bold;");
  }

  try {
    // 'fetch' realiza la petición HTTP. 'await' espera a que se complete.
    //SI EL FETCH POSTMAN
    //fetch(`${API_URL}/posts/${id}`);
    //postman
    //https://jsonplaceholder.typicode.com/posts/1
    // Usamos backticks (``) para concatenar la URL y el ID de forma dinámica.
    const response = await fetch(`${API_URL}/posts/${id}`);

    // Verificamos si la respuesta es exitosa (status 200-299).
    //TIENE UN LIMITE, SI PONEMOS EL 2000000 MOSTRARA EN PANTALLA
    
    if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
    }

    // Convertimos el cuerpo de la respuesta a JSON.
    // Le decimos a TS que el resultado es de tipo 'Post'.
    const data: Post = await response.json();

    // Imprimimos el resultado accediendo a las propiedades definidas en la interfaz.
    console.log("✅ Post recuperado:");
    console.log(`   - Título: ${data.title}`);
    console.log(`   - Cuerpo: ${data.body.substring(0, 50)}...`);
    
  } catch (error) {
    // Si algo falla (red, error de servidor, etc.), el error cae aquí.
    console.error("❌ Fallo en Lab 1:", error);
  }
};

/**
 * PASO 4: FUNCIÓN PARA CREAR DATOS (POST)
 * Aquí aprendemos a enviar un objeto JS al servidor.
 */
const createNewPost = async (): Promise<void> => {
  console.log("%c [LAB 2] Creando un nuevo recurso...", "color: orange; font-weight: bold;");

  // Definimos un objeto literal que sigue la lógica de nuestra interfaz.
  const myNewPost = {
    title: "Mi Post de Prueba",
    body: "Contenido generado desde el laboratorio de TypeScript.",
    userId: 10
  };

  try {
    // En el fetch, pasamos un objeto de configuración como segundo parámetro.
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST", // Especificamos que vamos a "enviar/crear".
      
      // El servidor requiere una cadena de texto, no un objeto JS.
      // 'JSON.stringify' hace esa conversión.
      body: JSON.stringify(myNewPost), 
      
      headers: {
        // Metadata: Informamos al servidor que el contenido es JSON con codificación UTF-8.
        "Content-type": "application/json; charset=UTF-8", 
      },
    });

    // La API responde con el objeto creado y un nuevo ID (usualmente el 101).
    const createdPost: Post = await response.json();
    
    console.log("✅ Recurso creado exitosamente en el servidor:");
    console.log(createdPost);

  } catch (error) {
    console.error("❌ Fallo en Lab 2:", error);
  }
};
// response.status - viene del servidor HTTP
// 200 = OK - 404 = NO ENCONTRADO
//data.title - viene del JSON ´ info del post ´

/*
        ##################################################
        EL RETO 
        ##################################################
*/

/**
 * PASO 6: RETO DE RECURSOS ANIDADOS (Pistas y estructura)
 * Objetivo: Obtener los comentarios que pertenecen a un Post específico.
 */
// PISTA A: Crea la interfaz 'Comment'. 
// Recuerda que la API devuelve: postId, id, name, email y body.

/**
 * PASO 7: FUNCIÓN DE BÚSQUEDA DE COMENTARIOS
 * Instrucciones:
 * 1. Usa la URL: ${API_URL}/posts/${id}/comments
 * 2. Recuerda que la respuesta es una LISTA (Array) de objetos Comment.
 * 3. Usa un bucle o método de array (como .forEach) para mostrar los datos.
 */
/**
 * RETO DE LABORATORIO: Obtener recursos anidados (Comments)
 * * Instrucciones para el estudiante:
 * Sigue los pasos numerados para completar la función.
 */
const fetchCommentsByPost = async (postId: number): Promise<void> => {
  // 1. [LOG]: Imprime en consola un mensaje avisando que vas a buscar 
  // los comentarios del 'postId' recibido. Usa estilos %c si quieres.
console.log(`%c Buscando comentarios... ${postId}...`, "color: blue; font-weight: bold;");
//¿q es console.log?
//se coloca el texto entre backticks, con la variable
  try {
    // 2. [PETICIÓN]: Crea una constante 'response'.
    // Usa 'fetch' con backticks para unir API_URL + /posts/ + postId + /comments.
     const response = await fetch(`${API_URL}/posts/${postId}/comments`);
     //const - crear
     //response-

    // 3. [VALIDACIÓN]: Si la respuesta (response.ok) es falsa, 
    // lanza un error (throw new Error) indicando que falló la carga.
    if (!response.ok) {
      //if es el caso
      throw new Error(`ERROR. La carga fallo. ${response.status}`);
      //marcar el error
      //throw
    }

    // 4. [TRADUCCIÓN]: Crea una constante 'data'.
    // Usa 'await response.json()' y asígnale el tipo 'Comment[]' (Array de comentarios).
    const data: Comment[] = await response.json();
    //construye

    // 5. [PROCESAMIENTO]: Una vez tengas los datos, imprime cuántos comentarios llegaron.
    // Tip: Usa data.length.
    console.log(`EXITO. Se encontraron ${data.length} comentarios`);

    // 6. [RECORRIDO]: Usa un método de array (como .forEach) para recorrer la lista.
    // Dentro, imprime solo el 'email' de cada comentario para verificar el tipado.
    data.forEach((comment) => {
    console.log(`📧 Email: ${comment.email}`);
    });

  } catch (error) {
    // 7. [ERRORES]: Captura el error y muéstralo con console.error.
  console.error("ERROR. No se encontro nada.", error);
  //SE COLOCA EL CREAR.VARIABLES("TEXTO", VARIABLE);
  }
};
//IMPORATANTE
//await fetchCommentsByPost(POST_ID_TO_SEARCH);
/**
 * PISTA FINAL DE EJECUCIÓN:
 * Dentro de tu función 'runLaboratory', no olvides añadir:
 * await fetchCommentsByPost(POST_ID_TO_SEARCH);
 */

/*
    ################################################################################
    
    Supabase challenge

    #################################################################################

 */

/**
 * PASO 1: CONFIGURACIÓN DE CONEXIÓN
 * Sustituye estos valores con los de tu proyecto en Supabase (Project Settings > API)
 */
const SUPABASE_URL: string = "https://edowcwplnnnjpybtfcll.supabase.co";
const SUPABASE_KEY: string = "sb_publishable_JPTg658IAqNhWoEjwJTOXA_8GomTesc";

/**
 * PASO 2: INICIALIZACIÓN DEL CLIENTE
 * Creamos el objeto que nos permite hablar con la base de datos.
 */
// DESCOMENTAR

//createClient es una función que viene del paquete de Supabase
//Para usarla, primero debes "importarla" (traerla) al archivo
//Sin esta línea, TypeScript no sabe qué es createClient y marca error
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
//ME MARCABA ERROR, IMPORTO LA OTRA
//import { createClient } from '@supabase/supabase-js';

//FETCH - llama http, ya no genera URL ni ENDPOINT 
//SUSTITUYEN .from().select()

//SELECT - trae ALL COLUMNS DE LA TABLA Q QUIERES
//.select('*')
/**
 * PASO 3: INTERFAZ DE DATOS
 * Definimos la estructura exacta de la tabla que vemos en tu imagen.
 */
interface Estudiante {
  id_alumno: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string; // DATE → string
  semestre: number;
  creditos: number;
}
/**
 * PASO 4: LA FUNCIÓN DE LECTURA (GET)
 * Esta función entra a la base de datos y trae los registros.
 */
const getEstudiantes = async (): Promise<void> => {

  const { data, error } = await supabase
    .from('estudiantes') // 👈 nombre EXACTO de tu tabla
    .select('*');

  if (error) {
    console.error("❌ Error al obtener estudiantes:", error.message);
    return;
  }

  const listaEstudiantes = data as Estudiante[];

  console.log("✅ Lista de estudiantes:");
  console.table(listaEstudiantes);
};
/**
 * PASO final: EJECUCIÓN DEL LABORATORIO
 * Creamos una función orquestadora para manejar el flujo de las llamadas.
 */
const runLaboratory = async () => {
  console.log("%c --- INICIO DEL EXPERIMENTO ---", "background: #222; color: #bada55; padding: 5px;");
  
  await fetchSinglePost(POST_ID_TO_SEARCH); 
  await createNewPost();    
  await fetchCommentsByPost(POST_ID_TO_SEARCH); 
  await getEstudiantes();   // ✅ ESTE ES EL IMPORTANTE
                
  console.log("%c --- EXPERIMENTO FINALIZADO ---", "background: #222; color: #bada55; padding: 5px;");
};
// Disparamos todo el proceso.
