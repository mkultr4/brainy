#!/usr/bin/env bash
#Autor: Ariel Lopez
user="XXXX"
pass="XXXXX"
host="XX.XXX.XX.XX"
folder='/var/www/xxxx/'
stage="design2"

echo -e "\x1B[01;36m starting building design2 \x1B[0m"

#! ng build --prod --aot=true --configuration=design

f
echo -e "\x1B[01;36m starting delete $folder \x1B[0m"
expect -c 'spawn ssh $user@$user "ls -lh file"; expect "assword:"; send "$pass\r"; interact'


echo -e "\x1B[01;94m Done \x1B[0m"
