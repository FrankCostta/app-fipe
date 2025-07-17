import axios from "axios";

const api = axios.create({
	baseURL: "https://fipe.parallelum.com.br/api/v2"
});

export default api;







/* 

https://fipe.parallelum.com.br/api/v2/references
https://fipe.parallelum.com.br/api/v2/{vehicleType}/brands
https://fipe.parallelum.com.br/api/v2/{vehicleType}/brands/{brandId}/models
https://fipe.parallelum.com.br/api/v2/{vehicleType}/brands/{brandId}/models/{modelId}/years
https://fipe.parallelum.com.br/api/v2/{vehicleType}/brands/{brandId}/models/{modelId}/years/{yearId}



*/