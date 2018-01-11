const SamlStrategy = require('passport-saml').Strategy;

module.exports = function (passport, config) {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new SamlStrategy(
    {
      path: '/login/callback',
      entryPoint: 'https://idp.ssocircle.com/sso/idpssoinit?metaAlias=%2Fpublicidp&spEntityID=NAKS',
      issuer: 'passport-saml'
    },
    function(profile, done) {
      console.log(profile)
      return done(null,
                {
                  id: profile.UserID,
                  email: profile.EmailAddress,
                  test:'googdle',
                  displayName: profile.cn,
                  firstName: profile.FirstName,
                  lastName: profile.LastName
                });
    })
  );
};

//   passport.use(new SamlStrategy(
//     {
//       path: config.passport.saml.path,
//       entryPoint: config.passport.saml.entryPoint,
//       issuer: config.passport.saml.issuer,
//       cert: config.passport.saml.cert
//     },
//     function (profile, done) {
//       return done(null,
//         {
//           id: profile.uid,
//           email: profile.email,
//           displayName: profile.cn,
//           firstName: profile.givenName,
//           lastName: profile.sn
//         });
//     })
//   );

// };
