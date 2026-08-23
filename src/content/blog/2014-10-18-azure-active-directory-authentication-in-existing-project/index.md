---
title: "Azure Active Directory authentication in existing project"
date: "2014-10-18T04:28:03.284Z"
path: "/blog/2014/10/18/azure-active-directory-authentication-in-existing-project/"
---

Recently, I needed to add Azure Active directory authentication to an existing web project. There was an automated tool for Visual Studio 2012 but there does not seem to be a similar component for 2013. A lot of the advice I found suggested creating a new project and importing a bit of the code / config from the other application -- that's what I did here. What follows is not a how-to but rather a log of the steps I took to use AAD authentication (mostly for [future reference](http://xkcd.com/1421/)).

###References###

First off there are some references that were missing in the project. I needed to add 

1. **System.IdentityModel** 
2. **System.IdentityModelServices** 

In addition to the system references, the **Microsoft Token Validation Extension** should be installed from NuGet.

###Code###
1. Copy over **DatabaseIssuerNameRegistry.cs** (I added this under utils\)
2. **IssuingAuthorityKey.cs** (model\tenant)
3. **Tenant.cs**
4. **TenantDbContext.cs**
5. **IdentityConfig.cs** (This needs to be in the app_start directory)


###Azure###
On your Azure active directory settings you will need to add an application. Click on Applications -> Add -> URL: Localhost:Port (or real URL) and give it the ID of the site you are developing. 

###Config###
Copy over the following config sections replacing any reference to ID / URL with the settings that were applied to the Application added in the Active Directory settings. 

1. **configuration\configSections\system.identityModel**
2. **configuration\configSections\system.identityModel.services**
3. **configuration\location**
4. **configuration.system.identityModel** - The DatabaseIssuerNameRegistry should have the fully qualified name of the DatabaseIssuer class.
5. **configuration\system.web\authentication**
6. **configuration\system.web\authorization**
7. **configuration.system.identityModel.services**
8. **configuration\appSettings**
    1. **ida:FederationMetadataLocation** - Use your active directory path
    2. **ida:Realm**
    3. **ida:AudienceUri**
9. **configuration\system.webServer**


Again this is not an exhaustive guide but rather a checklist for making sure the correct code/configuration is included in the existing project. 
