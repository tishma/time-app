<?php
/**
 * Created by PhpStorm.
 * User: tishma
 * Date: 1/3/15
 * Time: 1:22 AM
 */

require '../../../../src/TimeApp/Service/ConfigService.php';

use TimeApp\Service\ConfigService;

class ConfigServiceTest extends PHPUnit_Framework_TestCase
{
    /**
     * @var ConfigService
     */
    private $configService;

    public function setUp()
    {
        $this->configService = new ConfigService();
        $this->disableAllEnvironments();
    }

    function disableAllEnvironments()
    {
        foreach (ConfigService::$ENVIRONMENTS as $env) {
            $configFile = $this->configService->getAppDir() . "/config/$env.config";
            $this->disableEnvironment($env);
        }
    }

    private function disableEnvironment($env)
    {
        $configFile = $this->configService->getAppDir() . "/config/$env.config";
        if (file_exists($configFile)) {
            rename($configFile, $configFile . '~');
        }
    }

    public function tearDown(){
        $this->enableAllEnvironments();
    }

    function enableAllEnvironments() {
        foreach (ConfigService::$ENVIRONMENTS as $env) {
            $this->enableEnvironment($env);
        }
    }

    function enableEnvironment($env)
    {
        $configFile = $this->configService->getAppDir() . "/config/$env.config~";
        if (file_exists($configFile)) {
            rename($configFile, trim($configFile, '~'));
        }
    }

    public function testConfigLoads()
    {
        $this->enableAllEnvironments();
        $config = $this->configService->getConfig();
        $this->assertNotEmpty($config);
        $this->assertArrayHasKey('database', $config);
    }

    public function testNoConfigFoundThrowsException() {
        $configServiceMock = $this->getMock('\TimeApp\Service\ConfigService', array('getAppDir'));
        $configServiceMock->expects($this->once())->method('getAppDir');
        $this->setExpectedException('Exception');
        $configServiceMock->getConfig();
    }

}
