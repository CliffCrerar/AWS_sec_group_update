/**
 * SCRIPT TO UPDATE SEC GROUP
 * @summary Ensure AWS CLI preconfigured, this script will do the sec group update
 * @author Cliff Crerar
 * Created at     : 2019-01-14 22:37:26
 * Last modified  : 2019-01-14 23:08:41
 */

const publicIp = require('public-ip');
const cp = require('child_process');
const util = require('util');

const awsCliSecProf = 'ec2u';
const secGroupName = 'MailServer';
const secGroupPort = '22';
const ingress = true;
const secGroupDir = ingress ? 'authorize-security-group-ingress' : 'authorize-security-group-eagress';

(async () => {
    //console.log(await publicIp.v4());
    const publicIP = await publicIp.v4();
    const cidr = `${publicIP}/32`;
    const command = `aws ec2 ${secGroupDir} --group-name ${secGroupName} --protocol tcp --port ${secGroupPort} --cidr ${cidr} --profile ${awsCliSecProf}`;
    //=> '46.5.21.123'
    cp.exec(command, (err, stdout, stderr) => {
        let noMsg = true;

        if (err) {
            util.log('ERROR updating IP: ', err);
            util.log(stderr);
            noMsg = false;
        }

        if (stdout != '') {
            util.log('STANDARD OUTPUT: ', stdout);
            noMsg = false;
        }

        if (noMsg) {
            util.log('Security group updated successfully');
        }


    })
    //console.log(await publicIp.v6());
    //=> 'fe80::200:f8ff:fe21:67cf'
})();