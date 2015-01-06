<?php
/**
 * Created by PhpStorm.
 * User: tishma
 * Date: 1/3/15
 * Time: 12:53 AM
 */

namespace TimeApp\Service;


class ConfigService
{
    public static $ENVIRONMENTS = array('prod', 'stage', 'test', 'dev');

    public function getConfig()
    {
        $dir = $this->getAppDir();
        foreach(self::$ENVIRONMENTS as $env){
            $configFilePath = "$dir/config/$env.config";
            if(file_exists($configFilePath)){
                return parse_ini_file($configFilePath, $processSections = true);
            }
        }
        throw new \Exception('Application not configured. Please create environment.config file in config dir.');
    }

    public function getAppDir()
    {
        return dirname(dirname(dirname(dirname(__FILE__))));
    }

}