<?php 
function includeWithVariables($filePath, $variables = array(), $print = true){
    $output = NULL;
    if(file_exists($filePath)){
        // Extract the variables to a local namespace
        extract($variables);
        // echo gettype($variables);
        // Start output buffering
        ob_start();

        // Include the variable in the template file
        include $filePath;
        
        // End buffering and return its contents
        $output = ob_get_clean();
    }
    if ($print) {
        print $output;
    }
    return $output;
}
?>