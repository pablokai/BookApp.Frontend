export class Libro {
    constructor(idLibro, titulo,nombreAutor,primerApellidoAutor , segundoApellidoAutor, autor,editorial, idGenero, genero, annioPublicacion, portada, totalPaginas) {
      this.idLibro = idLibro;
      this.titulo = titulo;
      this.nombreAutor = nombreAutor;
      this.primerApellidoAutor = primerApellidoAutor;
      this.segundoApellidoAutor = segundoApellidoAutor;
      this.autor = autor;
      this.editorial = editorial;
      this.idGenero = idGenero;
      this.genero = genero;
      this.annioPublicacion = annioPublicacion;
      this.portada = portada;
      this.totalPaginas = totalPaginas;
    }
  }