import http from "../http-common";

export interface annonceResponse {
  id: number
  description: string
  image: string
  name: string
  price:number
  type: string

}
  export async function getAll() {
    return http.get('/getAnnonces')
  }
  export async function getAnnonceById(id:number) {
    return http.get(`/getAnnonceById/?id=${id}`)
   }
  export async function getAnnonceByNameAndType(name:string,type:string) {
   return http.get(`/getAnnonceByNameAndType/?name=${name}&&type=${type}`)
  }
  export async function deleteAnnonce(id:number) {
    return http.get('/deleteAnnonce/?id='+id)
  }
  export async function updateAnnonce(annonce:annonceResponse) {
    return http.post(`/updateAnnonce/?id=${annonce.id}`,annonce)
  }
  export async function createAnnonce(annonce:annonceResponse) {
    return http.post('/addAnnonce',annonce)
  }
  export async function onFileUpload (file: any){
    const formData = new FormData();


              console.log(file.name,file)
        formData.set(
          "file",
          file,
          file.name
              );
              console.log(formData.getAll("file"))
          // console log uploaded file details
          // user send req to the server
          http.post("/uploadFile/",formData);
      
      };


