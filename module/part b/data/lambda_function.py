import json
import logging
import boto3

logger = logging.getLogger()
logger.setLevel(logging.INFO)

client = boto3.client("cloudformation")
server_stack = ''
elb_stack = ''

def lambda_handler(event, context):
    logger.info('got event{}'.format(event))
    logger.error('something went wrong')
    
    client.delete_stack(StackName=server_stack)
    client.delete_stack(StackName=elb_stack)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Received event!')
    }