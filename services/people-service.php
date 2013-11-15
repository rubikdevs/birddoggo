<?
    if (isset($_GET['name']) && isset($_GET['lastname'])) {
        $name   = $_GET['name'];
        $lastname =  $_GET['lastname'];
        $zip = $_GET['zip'];
        $city = $_GET['city'];
        $state = $_GET['state'];
        $curlDefault = array(
            CURLOPT_PORT => 80, //ignore explicit setting of port 80
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_FOLLOWLOCATION => TRUE,
            CURLOPT_ENCODING => '',
            CURLOPT_HTTPHEADER => array(
                'Proxy-Connection: Close',
                'User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1017.2 Safari/535.19',
                'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Encoding: gzip,deflate,sdch',
                'Accept-Language: en-US,en;q=0.8',
                'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.3',
                'Cookie: __qca=blabla',
                'Connection: Close'
            ),
            CURLOPT_VERBOSE => TRUE // TRUE to output verbose information. Writes output to STDERR, or the file specified using CURLOPT_STDERR.
        );

        $paremeters = array(
            'firstname'=> $name,
            'lastname'=> $lastname,
            'zip'=>$zip,
            'state'=>$state,
            'city'=>$city,
            'api_key'=>'cff1348c711ae868da404a163d6568e0',
            'outputtype'=>'JSON'
        );

        $paremeters = array_filter($paremeters, 'strlen');
        $paremeters = http_build_query($paremeters,'',';');
        $url = 'http://api.whitepages.com/find_person/1.0/?'.$paremeters;
        

        $ch = curl_init($url);

        curl_setopt_array($ch, $curlDefault);
        
        
        $result = curl_exec($ch);
        echo json_encode($result);
    }
?>