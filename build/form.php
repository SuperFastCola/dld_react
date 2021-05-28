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
    <body>

		<?php
		
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			file_put_contents("test.json",json_encode($_POST,JSON_PRETTY_PRINT));
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

			for($proj_index=0; $proj_index<sizeof($file->projects); $proj_index++){
				echo '<section class="form-row">';
				echo '<h3 class="col-12">' . $file->projects[$proj_index]->name->en . '</h3>';

				foreach($file->projects[$proj_index] as $prop_name => $prop_value){ 
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

									$url_input_name = "projects[{$proj_index}][image][{$url_lang_key}]";

									echo '<div class="form-group">';
									echo '<lable>URL ' . $url_index . '</label>';
									echo '<input type="text" class="form-control mb-2" name="' . $url_input_name . '[' .$url_index . ']" value="' . $link . '">';
									echo '<input type="text" class="form-control mb-2" name="' . $url_input_name . '[' .$url_index . ']" value="' . $text . '">';
									echo "</div>";
								}
							echo '</div>';	
						}
						echo '</div>';
						echo '</div>';
					}

				}

				echo '</section>';
			}
			echo '<input type="submit" value="Submit">';
			echo '</form>';
		}
		?>

	</body>
</html>


