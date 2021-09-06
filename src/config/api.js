const api = {

	endpoint: 'http://127.0.0.1:3000/',

	without_token: ["user/login", "user/registro"],

	// TOKENS
		save_token: function(token){
			localStorage.setItem("token", token);
		},

		get_token: function(){
			if( localStorage.getItem("token") == null){
				return null;
			}else{
				return localStorage.getItem("token");
			}

		},

		remove_token: function(){
			localStorage.removeItem("token");
		},

	// METHODS
		post: async function(url, obj={}){
			const new_url = this.endpoint+url;

			const response = await fetch(new_url, {
				method: "POST",
				headers: {
					'Content-Type': "application/json",
					'token': this.get_token()
				},
				redirect: 'follow',
				body: JSON.stringify(obj)
			});

			return response.json();

		},

		get: async function(url, obj={}){
			
			var new_url = this.endpoint+url;

			// DATOS POR GET
				let query = Object.keys(obj).map(k=>encodeURIComponent(k)+'='+encodeURIComponent(obj[k])).join("&");
				new_url = new_url+"?"+query;

			const response = await fetch(new_url, {
				method: 'GET',
				headers: {
					'Content-Type': "application/json",
					'token': this.get_token()
				},
				redirect: 'follow'
			});

			return response.json();

		}
};

export default api;