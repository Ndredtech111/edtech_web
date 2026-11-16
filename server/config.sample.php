<?php
/**
 * Copy this file to config.php ON THE SERVER ONLY and fill in your GoDaddy MySQL details.
 * config.php is git-ignored — never commit real passwords.
 */
return [
    'db_host' => 'localhost',          // GoDaddy cPanel hosting: usually "localhost"
    'db_name' => 'cpanelprefix_ndrleads',
    'db_user' => 'cpanelprefix_ndruser',
    'db_pass' => 'CHANGE_ME',

    // Websites allowed to send enquiries to this script
    'allowed_origins' => [
        'https://ndredtech.com',
        'https://www.ndredtech.com',
        'https://ndrinfotech.com',
        'https://www.ndrinfotech.com',
        'https://ndredtech111.github.io',
        'http://localhost:8000',
    ],
];
