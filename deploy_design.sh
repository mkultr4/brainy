#!/usr/bin/env bash
#Autor: Fidel Saldivar

stage="design2"

echo -e "\x1B[01;36m starting building design2 \x1B[0m"

ng build --prod --aot=true --configuration=design


echo -e "\x1B[01;36m starting delete s3://$stage.squintapp.com \x1B[0m"
aws s3 rm s3://$stage.squintapp.com --recursive

echo -e "\x1B[01;96m starting cp s3://$stage.squintapp.com \x1B[0m"
aws s3 cp ./dist s3://$stage.squintapp.com --recursive --acl public-read

echo -e "\x1B[01;94m Done \x1B[0m"
