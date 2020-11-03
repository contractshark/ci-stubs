#!/bin/bash

SOLIDITY_ENTRYPOINT=$FILE
SOLIDITY_VERSON=$VERSION

echo "==> Download the mythril docker image";
docker pull mythril/myth


 
echo "==> Build folders"
if [ ! -d "build" ]; then
  mkdir 'build';
fi
if [ ! -d "build/flatter" ]; then
  mkdir 'build/flatter';
fi

echo "==> Flatter contracts"
truffle-flattener ./contracts/$SOLIDITY_ENTRYPOINT.sol  > ./build/flatter/$SOLIDITY_ENTRYPOINT.flat.sol 

echo "==> Launch myth analyze"
docker run -v $(pwd):/tmp mythril/myth -v 4 analyze /tmp/build/flatter/$SOLIDITY_ENTRYPOINT.flat.sol:$SOLIDITY_ENTRYPOINT --solv $SOLIDITY_VERSON
