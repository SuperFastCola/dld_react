<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="/static/css/bootstrap.min.css">
    </head>
    <body class="px-2 py-4">

		<?php
		
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			//file_put_contents("test.json",utf8_encode(json_encode($_POST,JSON_PRETTY_PRINT)));
			echo "<pre>";
			print_r(json_encode($_POST,JSON_PRETTY_PRINT));
			echo "</pre>";
			echo '<a href="' . $_SERVER['PHP_SELF'] . '">Project have been written</a>';
			
		}
		else{

			echo '<form action="' . $_SERVER["PHP_SELF"] . '" class="container" method="POST">';
		
			function techItems($array){
				return implode(", ", $array);
			}

			function imageItems($array){
				return implode(", ", $array);
			}


			$file =json_decode(file_get_contents("projects.json"));
			$labels = new \stdClass();
			$labels->en = "English";
			$labels->fr = "French";

			$obj_props = array("name","description","role","tech","image","url","id","type");

			//for($proj_index=0; $proj_index<sizeof($file->projects); $proj_index++){
			for($proj_index=0; $proj_index<2; $proj_index++){
				echo '<section class="form-row">';
				echo '<h3 class="col-12 px-0 d-flex"><span class="flex-grow-1">' . $file->projects[$proj_index]->name->en . '</span>';
				echo '<button type="button" class="btn btn-outline-primary show-project" data-project=' . $proj_index . '>Show Project</button>';
				echo '</h3>';
				
					echo '<div class="collapse row project-' . $proj_index . '">';

					foreach($obj_props as $prop_name){
						$prop_value = $file->projects[$proj_index]->{$prop_name};
						$values = array($prop_value->en,$prop_value->fr); 
				

						switch($prop_name){
							case "tech":
								$values[0] = techItems($values[0]);
								$values[1] = techItems($values[1]);
							break;
						}

						$input_name = array();
						$input_name[0] = "projects[{$proj_index}][{$prop_name}][en]";
						$input_name[1] = "projects[{$proj_index}][{$prop_name}][fr]";

						if(preg_match("/name|description|role|tech/",$prop_name)){
							echo '<div class="col-12" id="' . $prop_name . '">';
								echo '<label class="text-uppercase font-weight-bold">' .$prop_name . '</label>';
								echo '<div class="row">';
									echo '<div class="form-group col-12 col-md-6">';
									echo '<label>' .$labels->en . '</label>';
									echo '<input type="text" class="form-control" name="' . $input_name[0] . '" value="' . $values[0]  . '">';
									echo '</div>';

									echo '<div class="form-group col-12 col-md-6">';
									echo '<label>' .$labels->fr . '</label>';
									echo '<input type="text" class="form-control" name="' . $input_name[1] . '" value="' . $values[1] . '">';
									echo '</div>';
								echo '</div>';
							echo '</div>';
						}

						if(preg_match("/image/",$prop_name)){
							echo '<div class="col-12" id="' . $prop_name . '">';
							echo '<label class="text-uppercase font-weight-bold">' .$prop_name . '</label>';
							echo '<div class="row">';
							//cycle through language value
							foreach($prop_value as $langkey => $images){
								echo '<div class="col-12 col-md-6">';
								echo '<label>' .$labels->{$langkey} . '</label>';

								$sizes = array("sm","md","lg");
								$image_input_name = "projects[{$proj_index}][image][{$langkey}]";

								for($i=0;$i<sizeof($sizes);$i++){
									echo '<div class="form-group d-flex align-items-center">';
									echo '<label class="text-uppercase m-0 mr-1">' .$sizes[$i] . '</label>';
									echo '<input type="text" class="form-control" name="' . $image_input_name . '[' . $sizes[$i] . ']" value="' . $images->{$sizes[$i]} . '">';
									echo "</div>";
								}
								echo "</div>";
							}
							echo '</div>';
							echo '</div>';
						}

						if(preg_match("/url/",$prop_name)){
							echo '<div class="col-12" id="' . $prop_name . '">';
							echo '<label class="text-uppercase font-weight-bold">' .$prop_name . '</label>';
							echo '<div class="row">';

							foreach($prop_value as $url_lang_key => $urls_lang){
								echo '<div class="col-12 col-md-6">';
									echo '<label>' . $labels->{$url_lang_key} . '</label>';
									for($url_index=0;$url_index<5;$url_index++){

										$link = ( isset($urls_lang[$url_index]) )? $urls_lang[$url_index]->link : "";
										$text = ( isset($urls_lang[$url_index]) )? $urls_lang[$url_index]->text : "";

										$url_input_name = "projects[{$proj_index}][url][{$url_lang_key}]";

										echo '<div class="form-group">';
										echo '<label>URL ' . $url_index . '</label>';
										echo '<input type="text" class="form-control mb-2" name="' . $url_input_name . '[' .$url_index . '][link]" value="' . $link . '">';
										echo '<input type="text" class="form-control mb-2" name="' . $url_input_name . '[' .$url_index . '][text]" value="' . $text . '">';
										echo "</div>";
									}
								echo '</div>';	
							}
							echo '</div>';
							echo '</div>';
						}

					}
					echo '</div>';


				echo '</section>';
			}
			echo '<input type="submit" class="btn btn-primary" value="Submit">';
			echo '</form>';
		}
		?>
	<script>
	var showButtons = document.querySelectorAll(".show-project");
	
	showButtons.forEach(function(element){
		element.addEventListener("click",function(e){
			var selector = ".project-" + String(e.currentTarget.dataset.project);
			var project = document.querySelector(selector);


			project.classList.toggle("collapse");
		});
	});
	</script>
	</body>
</html>


